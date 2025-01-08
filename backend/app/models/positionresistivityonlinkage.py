from django.db import models

class PositionResistivityOnLinkage(models.Model):
    id_linkage = models.ForeignKey('Linkage', models.DO_NOTHING, db_column='idLinkage')  # Field name made lowercase.
    id_position_resistivity = models.OneToOneField('PositionResistivity', models.DO_NOTHING, db_column='idPositionResistivity')

    class Meta:
        managed = False
        db_table = 'PositionResistivityOnLinkage'
