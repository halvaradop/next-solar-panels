from django.db import models


class Auditlog(models.Model):
    idaudit = models.AutoField(db_column='idAudit', primary_key=True)  # Field name made lowercase.
    tablename = models.CharField(db_column='tableName', max_length=100)  # Field name made lowercase.
    actiontype = models.CharField(db_column='actionType', max_length=6)  # Field name made lowercase.
    date = models.DateTimeField(blank=True, null=True)
    state = models.CharField(max_length=8, blank=True, null=True)
    idcontactperson = models.ForeignKey('Contactperson', models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercas>

    class Meta:
        managed = False
        db_table = 'AuditLog'
