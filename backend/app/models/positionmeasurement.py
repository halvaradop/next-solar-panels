from django.db import models

class PositionMeasurement(models.Model):
    id_position_measurement = models.CharField(db_column='idPositionMeasurement', primary_key=True, max_length=36)  # Field name made >
    designation = models.CharField(max_length=255)
    date = models.DateTimeField(blank=True, null=True)
    update_at = models.DateTimeField(db_column='updateAt', blank=True, null=True)  # Field name made lowercase.
    potential_vr = models.FloatField(db_column='potentialVr', blank=True, null=True)  # Field name made lowercase.
    potential_v_on = models.FloatField(db_column='potentialVOn', blank=True, null=True)  # Field name made lowercase.
    potential_v_off = models.FloatField(db_column='potentialVOff', blank=True, null=True)  # Field name made lowercase.
    galvanic_current = models.FloatField(db_column='galvanicCurrent', blank=True, null=True)  # Field name made lowercase.
    coating_thickness = models.FloatField(db_column='coatingThickness', blank=True, null=True)  # Field name made lowercase.
    material_trickness = models.FloatField(db_column='materialTrickness', blank=True, null=True)  # Field name made lowercase.
    id_contact_person = models.ForeignKey('ContactPerson', models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PositionMeasurement'
