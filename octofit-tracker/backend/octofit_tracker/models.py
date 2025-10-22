from djongo import models
from django.contrib.auth.models import AbstractUser

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.name

class Activity(models.Model):
    name = models.CharField(max_length=100)
    user = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.name} - {self.user}"

class Leaderboard(models.Model):
    user = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    score = models.IntegerField()
    def __str__(self):
        return f"{self.user} - {self.score}"

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    user = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.name} - {self.user}"
