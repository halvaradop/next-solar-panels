from django.db import models


class Field(models.Model):
    id_field = models.CharField(db_column='idField', primary_key=True, max_length=36)  # Field name made lowercase.
    designation = models.CharField(max_length=255)
    fence = models.IntegerField(blank=True, null=True)
    connection_earthing_fence = models.IntegerField(db_column='connectionEarthingFence', blank=True, null=True)  # Field name made low>
    external_current_influence = models.IntegerField(db_column='externalCurrentInfluence', blank=True, null=True)  # Field name made l>    state = models.CharField(max_length=8, blank=True, null=True)
    id_address = models.ForeignKey('Address', models.DO_NOTHING, db_column='idAddress')  # Field name made lowercase.
    id_project = models.ForeignKey('Project', models.DO_NOTHING, db_column='idProject')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Field'
