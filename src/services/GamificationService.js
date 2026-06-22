const db = require('../../db');

class GamificationService {
  async getUserProfile(userId) {
    const res = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    return res.rows[0] || null;
  }

  async completeActivity(userId, activityId) {
    const user = await this.getUserProfile(userId);
    if (!user) throw new Error('User not found');

    const activityRes = await db.query('SELECT * FROM cursos WHERE id = $1', [activityId]);
    const activity = activityRes.rows[0] || null;

    if (!activity) throw new Error('Activity not found');

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const lastActivityDate = user.last_activity_date;

    let newStreak = user.current_streak;

    if (!lastActivityDate) {
      newStreak = 1;
    } else {
      const lastDate = new Date(lastActivityDate);
      const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
      // If diffDays === 0 (same day), streak remains the same
    }

    const xpTable = {
      'Easy': 10,
      'Medium': 25,
      'Hard': 50
    };
    const awardedXp = xpTable[activity.difficulty] || 25;

    await db.query(`
      UPDATE users 
      SET total_xp = total_xp + $1, 
          current_streak = $2, 
          last_activity_date = $3 
      WHERE id = $4
    `, [awardedXp, newStreak, todayStr, userId]);

    return {
      awardedXp,
      newStreak,
      totalXp: user.total_xp + awardedXp
    };
  }
}

module.exports = new GamificationService();