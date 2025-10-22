from django.test import TestCase
from django.contrib.auth.models import User
from .models import Team, Activity, Leaderboard, Workout

class BasicModelTests(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(str(team), 'Test Team')

    def test_activity_creation(self):
        activity = Activity.objects.create(name='Test', user='user', team='team')
        self.assertEqual(str(activity), 'Test - user')

    def test_leaderboard_creation(self):
        lb = Leaderboard.objects.create(user='user', team='team', score=10)
        self.assertEqual(str(lb), 'user - 10')

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Test', description='desc', user='user')
        self.assertEqual(str(workout), 'Test - user')
