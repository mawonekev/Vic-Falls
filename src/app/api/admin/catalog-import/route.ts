import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import * as XLSX from 'xlsx';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const isCommit = formData.get('commit') === 'true';

    if (!file) {
      return NextResponse.json({ error: 'No Excel file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const workbook = XLSX.read(buffer, { type: 'buffer' });

    // Validate sheets
    if (!workbook.SheetNames.includes('Activities')) {
      return NextResponse.json(
        { error: 'Workbook must contain an "Activities" sheet. Found: ' + workbook.SheetNames.join(', ') },
        { status: 400 }
      );
    }

    const activitiesSheet = workbook.Sheets['Activities'];
    const rawActivities: any[] = XLSX.utils.sheet_to_json(activitiesSheet);

    let rawAddOns: any[] = [];
    if (workbook.SheetNames.includes('AddOns')) {
      const addOnsSheet = workbook.Sheets['AddOns'];
      rawAddOns = XLSX.utils.sheet_to_json(addOnsSheet);
    }

    const currentActivities = db.getActivities();
    const diffs: any[] = [];

    // Parse each row from sheet
    for (const row of rawActivities) {
      const slug = row.slug || row.Slug;
      const name = row.name || row.Name;
      const grossPriceUSD = parseFloat(row.grossPriceUSD || row.GrossPriceUSD || row.Price || 0);
      const nettPriceUSD = parseFloat(row.nettPriceUSD || row.NettPriceUSD || 0);
      const parkFeeUSD = parseFloat(row.parkFeeUSD || row.ParkFeeUSD || 0);
      const durationMinutes = parseInt(row.durationMinutes || row.DurationMinutes || 15);
      const destination = row.destination || row.Destination || 'VICTORIA_FALLS';
      const category = row.category || row.Category || 'AIR';

      if (!slug) continue;

      const existing = currentActivities.find(a => a.slug === slug);

      // Extract associated AddOns for this activity
      const matchingAddOns = rawAddOns
        .filter(ao => (ao.activitySlug || ao.ActivitySlug) === slug)
        .map((ao, idx) => ({
          id: `addon-${slug}-${idx + 1}`,
          activityId: existing ? existing.id : `act-${slug}`,
          name: ao.name || ao.Name || 'Add-on',
          description: ao.description || ao.Description || '',
          grossPriceUSD: parseFloat(ao.grossPriceUSD || ao.GrossPriceUSD || 0),
          nettPriceUSD: parseFloat(ao.nettPriceUSD || ao.NettPriceUSD || 0),
          capacityLimit: ao.capacityLimit !== undefined && ao.capacityLimit !== '' && ao.capacityLimit !== null ? parseInt(ao.capacityLimit) : null,
          status: 'ACTIVE' as const
        }));

      const diffItem = {
        slug,
        name: name || existing?.name || slug,
        destination,
        category,
        existingPrice: existing ? existing.grossPriceUSD : null,
        newPrice: grossPriceUSD,
        existingNett: existing ? existing.nettPriceUSD : null,
        newNett: nettPriceUSD,
        existingParkFee: existing ? existing.parkFeeUSD : null,
        newParkFee: parkFeeUSD,
        addOnCount: matchingAddOns.length,
        status: existing ? (existing.grossPriceUSD !== grossPriceUSD ? 'MODIFIED' : 'UNCHANGED') : 'NEW',
        dataToCommit: {
          slug,
          name: name || existing?.name || slug,
          destination,
          category,
          grossPriceUSD,
          nettPriceUSD,
          parkFeeUSD,
          durationMinutes,
          addOns: matchingAddOns.length > 0 ? matchingAddOns : (existing ? existing.addOns : [])
        }
      };

      diffs.push(diffItem);

      if (isCommit) {
        db.updateActivityFromCatalog(diffItem.dataToCommit);
      }
    }

    return NextResponse.json({
      success: true,
      committed: isCommit,
      diffCount: diffs.length,
      diffs
    });
  } catch (err: any) {
    console.error('Catalog import error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
