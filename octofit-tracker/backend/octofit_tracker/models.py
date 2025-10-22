from djongo import models
from bson import ObjectId

# Explicit ObjectIdField primary keys with default callable to ensure ObjectIds
# are generated at creation time and serialized as 'id'.

class Team(models.Model):
    id = models.ObjectIdField(primary_key=True, default=ObjectId)
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.name

class Activity(models.Model):
    id = models.ObjectIdField(primary_key=True, default=ObjectId)
    name = models.CharField(max_length=100)
    user = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.name} - {self.user}"

class Leaderboard(models.Model):
    id = models.ObjectIdField(primary_key=True, default=ObjectId)
    user = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    score = models.IntegerField()
    def __str__(self):
        return f"{self.user} - {self.score}"

class Workout(models.Model):
    id = models.ObjectIdField(primary_key=True, default=ObjectId)
    name = models.CharField(max_length=100)
    description = models.TextField()
    user = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.name} - {self.user}"
