from django.db import models


class Linkage(models.Model):
    id_linkage = models.CharField(db_column='idLinkage', primary_key=True, max_length=255)  # Field name made lowercase.
    date = models.DateTimeField(blank=True, null=True)
    update_at = models.DateTimeField(db_column='updateAt', blank=True, null=True)  # Field name made lowercase.
    id_position_data = models.ForeignKey('Positiondata', models.DO_NOTHING, db_column='idPositionData')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Linkage'
