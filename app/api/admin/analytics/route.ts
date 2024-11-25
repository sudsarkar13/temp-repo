import { NextResponse, NextRequest } from 'next/server';
import Analytics from '@/models/analytics';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Check auth token from cookie
    const token = request.cookies.get('admin_token');
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the last 7 days of analytics data
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const analyticsData = await Analytics.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          type: { $in: ['pageView', 'projectClick'] }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            type: "$type"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          views: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "pageView"] }, "$count", 0]
            }
          },
          clicks: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "projectClick"] }, "$count", 0]
            }
          }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          views: 1,
          clicks: 1
        }
      }
    ]);

    // Fill in missing dates with zero counts
    const chartData = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const existingData = analyticsData.find(d => d.date === dateStr);
      chartData.push({
        date: dateStr,
        views: existingData?.views || 0,
        clicks: existingData?.clicks || 0,
      });
    }

    return NextResponse.json({ chartData });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { message: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
