from django.db import models

class PositionResistivity(models.Model):
    id_position_resistivity = models.CharField(db_column='idPositionResistivity', primary_key=True, max_length=36)  # Field name made >
    designation = models.CharField(max_length=255)
    date = models.DateTimeField(blank=True, null=True)
    update_at = models.DateTimeField(db_column='updateAt', blank=True, null=True)  # Field name made lowercase.
    depth = models.FloatField()
    orientation = models.FloatField()
    value = models.FloatField()
    measurement_instrument = models.CharField(db_column='measurementInstrument', max_length=255)  # Field name made lowercase.
    id_contact_person = models.ForeignKey(Contactperson, models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PositionResistivity'
