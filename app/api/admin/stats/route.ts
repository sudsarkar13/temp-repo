import { NextResponse } from 'next/server';
import { Project } from '@/models/Project';
import { Message } from '@/models/Message';
import Analytics from '@/models/analytics';

export async function GET(request: Request) {
  try {
    // Check auth token from cookie
    const token = request.cookies.get('admin_token');
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get counts
    const [
      totalProjects,
      publishedProjects,
      totalMessages,
      unreadMessages,
      totalPageViews,
      totalProjectViews,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: 'published' }),
      Message.countDocuments(),
      Message.countDocuments({ status: 'unread' }),
      Analytics.countDocuments({ type: 'pageView' }),
      Analytics.countDocuments({ type: 'projectView' }),
    ]);

    // Get recent messages
    const recentMessages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name subject status createdAt');

    // Get top projects
    const topProjects = await Project.find({ status: 'published' })
      .sort({ viewCount: -1 })
      .limit(5)
      .select('title viewCount');

    return NextResponse.json({
      counts: {
        totalProjects,
        publishedProjects,
        totalMessages,
        unreadMessages,
        totalPageViews,
        totalProjectViews,
      },
      recentMessages: recentMessages.map(msg => ({
        id: msg._id,
        name: msg.name,
        subject: msg.subject,
        status: msg.status,
        createdAt: msg.createdAt,
      })),
      topProjects: topProjects.map(project => ({
        id: project._id,
        title: project.title,
        views: project.viewCount,
      })),
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
