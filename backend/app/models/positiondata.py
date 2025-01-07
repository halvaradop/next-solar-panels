from django.db import models

class Positiondata(models.Model):
    idpositiondata = models.CharField(db_column='idPositionData', primary_key=True, max_length=36)  # Field name made lowercase.
    pointtype = models.CharField(db_column='pointType', max_length=11)  # Field name made lowercase.
    latitude = models.FloatField()
    longitude = models.FloatField()
    piledesignation = models.CharField(db_column='pileDesignation', max_length=255)  # Field name made lowercase.
    pointdesignation = models.CharField(db_column='pointDesignation', max_length=255)  # Field name made lowercase.
    grounding = models.IntegerField(blank=True, null=True)
    idfield = models.ForeignKey(Field, models.DO_NOTHING, db_column='idField')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PositionData'
