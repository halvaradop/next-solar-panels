from django.db import models

class Positionmeasurement(models.Model):
    idpositionmeasurement = models.CharField(db_column='idPositionMeasurement', primary_key=True, max_length=36)  # Field name made >
    designation = models.CharField(max_length=255)
    date = models.DateTimeField(blank=True, null=True)
    updateat = models.DateTimeField(db_column='updateAt', blank=True, null=True)  # Field name made lowercase.
    potentialvr = models.FloatField(db_column='potentialVr', blank=True, null=True)  # Field name made lowercase.
    potentialvon = models.FloatField(db_column='potentialVOn', blank=True, null=True)  # Field name made lowercase.
    potentialvoff = models.FloatField(db_column='potentialVOff', blank=True, null=True)  # Field name made lowercase.
    galvaniccurrent = models.FloatField(db_column='galvanicCurrent', blank=True, null=True)  # Field name made lowercase.
    coatingthickness = models.FloatField(db_column='coatingThickness', blank=True, null=True)  # Field name made lowercase.
    materialtrickness = models.FloatField(db_column='materialTrickness', blank=True, null=True)  # Field name made lowercase.
    idcontactperson = models.ForeignKey(Contactperson, models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PositionMeasurement'
