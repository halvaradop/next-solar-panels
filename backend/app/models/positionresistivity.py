from django.db import models

class Positionresistivity(models.Model):
    idpositionresistivity = models.CharField(db_column='idPositionResistivity', primary_key=True, max_length=36)  # Field name made >
    designation = models.CharField(max_length=255)
    date = models.DateTimeField(blank=True, null=True)
    updateat = models.DateTimeField(db_column='updateAt', blank=True, null=True)  # Field name made lowercase.
    depth = models.FloatField()
    orientation = models.FloatField()
    value = models.FloatField()
    measurementinstrument = models.CharField(db_column='measurementInstrument', max_length=255)  # Field name made lowercase.
    idcontactperson = models.ForeignKey(Contactperson, models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PositionResistivity'
