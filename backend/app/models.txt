# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Address(models.Model):
    idaddress = models.AutoField(db_column='idAddress', primary_key=True)  # Field name made lowercase.
    country = models.CharField(max_length=255, blank=True, null=True)
    state = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    postbox = models.CharField(max_length=255, blank=True, null=True)
    street = models.CharField(max_length=255, blank=True, null=True)
    number = models.CharField(max_length=255, blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    isactive = models.CharField(db_column='isActive', max_length=8, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Address'


class Auditlog(models.Model):
    idaudit = models.AutoField(db_column='idAudit', primary_key=True)  # Field name made lowercase.
    tablename = models.CharField(db_column='tableName', max_length=100)  # Field name made lowercase.
    actiontype = models.CharField(db_column='actionType', max_length=6)  # Field name made lowercase.
    date = models.DateTimeField(blank=True, null=True)
    state = models.CharField(max_length=8, blank=True, null=True)
    idcontactperson = models.ForeignKey('Contactperson', models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'AuditLog'


class Constants(models.Model):
    idconstants = models.AutoField(db_column='idConstants', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=100)
    value = models.FloatField()
    unit = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'Constants'


class Contactperson(models.Model):
    idcontactperson = models.CharField(db_column='idContactPerson', primary_key=True, max_length=36)  # Field name made lowercase.
    firstname = models.CharField(db_column='firstName', max_length=50)  # Field name made lowercase.
    lastname = models.CharField(db_column='lastName', max_length=50)  # Field name made lowercase.
    fax = models.CharField(max_length=255, blank=True, null=True)
    www = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(unique=True, max_length=100)
    password = models.CharField(max_length=50)
    state = models.CharField(max_length=8, blank=True, null=True)
    idrole = models.ForeignKey('Role', models.DO_NOTHING, db_column='idRole')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ContactPerson'


class Field(models.Model):
    idfield = models.CharField(db_column='idField', primary_key=True, max_length=36)  # Field name made lowercase.
    designation = models.CharField(max_length=255)
    fence = models.IntegerField(blank=True, null=True)
    connectionearthingfence = models.IntegerField(db_column='connectionEarthingFence', blank=True, null=True)  # Field name made lowercase.
    externalcurrentinfluence = models.IntegerField(db_column='externalCurrentInfluence', blank=True, null=True)  # Field name made lowercase.
    state = models.CharField(max_length=8, blank=True, null=True)
    idaddress = models.ForeignKey(Address, models.DO_NOTHING, db_column='idAddress')  # Field name made lowercase.
    idproject = models.ForeignKey('Project', models.DO_NOTHING, db_column='idProject')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Field'


class Linkage(models.Model):
    idlinkage = models.CharField(db_column='idLinkage', primary_key=True, max_length=255)  # Field name made lowercase.
    date = models.DateTimeField(blank=True, null=True)
    updateat = models.DateTimeField(db_column='updateAt', blank=True, null=True)  # Field name made lowercase.
    idpositiondata = models.ForeignKey('Positiondata', models.DO_NOTHING, db_column='idPositionData')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Linkage'


class Material(models.Model):
    idmaterial = models.AutoField(db_column='idMaterial', primary_key=True)  # Field name made lowercase.
    matarialtype = models.CharField(db_column='matarialType', max_length=100)  # Field name made lowercase.
    epotential = models.FloatField(db_column='ePotential')  # Field name made lowercase.
    valency = models.IntegerField()
    molarmass = models.FloatField(db_column='molarMass')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Material'


class Phonecontactperson(models.Model):
    idphone = models.AutoField(db_column='idPhone', primary_key=True)  # Field name made lowercase.
    number = models.CharField(max_length=255)
    idcontactperson = models.ForeignKey(Contactperson, models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PhoneContactPerson'


class Phonestakeholder(models.Model):
    idphone = models.AutoField(db_column='idPhone', primary_key=True)  # Field name made lowercase.
    number = models.CharField(max_length=255)
    stakeholderid = models.ForeignKey('Stakeholder', models.DO_NOTHING, db_column='stakeHolderId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PhoneStakeHolder'


class Picture(models.Model):
    idpicture = models.AutoField(db_column='idPicture', primary_key=True)  # Field name made lowercase.
    idstakeholder = models.CharField(db_column='idStakeholder', max_length=255)  # Field name made lowercase.
    designation = models.CharField(max_length=255)
    date = models.DateTimeField(blank=True, null=True)
    updateat = models.DateTimeField(db_column='updateAt', blank=True, null=True)  # Field name made lowercase.
    picturefile = models.CharField(db_column='pictureFile', max_length=255)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Picture'


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


class Positionmeasurement(models.Model):
    idpositionmeasurement = models.CharField(db_column='idPositionMeasurement', primary_key=True, max_length=36)  # Field name made lowercase.
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


class Positionmeasurementonlinkage(models.Model):
    idlinkage = models.ForeignKey(Linkage, models.DO_NOTHING, db_column='idLinkage')  # Field name made lowercase.
    idpositionmeasurement = models.OneToOneField(Positionmeasurement, models.DO_NOTHING, db_column='idPositionMeasurement', primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PositionMeasurementOnLinkage'


class Positionresistivity(models.Model):
    idpositionresistivity = models.CharField(db_column='idPositionResistivity', primary_key=True, max_length=36)  # Field name made lowercase.
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


class Positionresistivityonlinkage(models.Model):
    idlinkage = models.ForeignKey(Linkage, models.DO_NOTHING, db_column='idLinkage')  # Field name made lowercase.
    idpositionresistivity = models.OneToOneField(Positionresistivity, models.DO_NOTHING, db_column='idPositionResistivity', primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PositionResistivityOnLinkage'


class Positionsoildata(models.Model):
    idpositionsoildata = models.CharField(db_column='idPositionSoilData', primary_key=True, max_length=36)  # Field name made lowercase.
    date = models.DateTimeField(blank=True, null=True)
    updateat = models.DateTimeField(db_column='updateAt', blank=True, null=True)  # Field name made lowercase.
    z1 = models.FloatField(blank=True, null=True)
    z2 = models.FloatField(blank=True, null=True)
    z3 = models.FloatField(blank=True, null=True)
    z4 = models.FloatField(blank=True, null=True)
    z5 = models.FloatField(blank=True, null=True)
    z6 = models.FloatField(blank=True, null=True)
    z7 = models.FloatField(blank=True, null=True)
    z8 = models.FloatField(blank=True, null=True)
    z9 = models.FloatField(blank=True, null=True)
    z10 = models.FloatField(blank=True, null=True)
    z11 = models.FloatField(blank=True, null=True)
    z12 = models.FloatField(blank=True, null=True)
    z13 = models.FloatField(blank=True, null=True)
    z14 = models.FloatField(blank=True, null=True)
    z15 = models.FloatField(blank=True, null=True)
    b0 = models.FloatField(blank=True, null=True)
    b1 = models.FloatField(blank=True, null=True)
    chlorides = models.FloatField(blank=True, null=True)
    idcontactperson = models.ForeignKey(Contactperson, models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PositionSoilData'


class Positionsoildataonlinkage(models.Model):
    idlinkage = models.ForeignKey(Linkage, models.DO_NOTHING, db_column='idLinkage')  # Field name made lowercase.
    idpositionsoildata = models.OneToOneField(Positionsoildata, models.DO_NOTHING, db_column='idPositionSoilData', primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PositionSoilDataOnLinkage'


class Project(models.Model):
    idproject = models.CharField(db_column='idProject', primary_key=True, max_length=36)  # Field name made lowercase.
    state = models.CharField(max_length=8, blank=True, null=True)
    designation = models.CharField(max_length=255)
    idcontactperson = models.ForeignKey(Contactperson, models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercase.
    idstakeholder = models.ForeignKey('Stakeholder', models.DO_NOTHING, db_column='idStakeholder')  # Field name made lowercase.
    idaddress = models.ForeignKey(Address, models.DO_NOTHING, db_column='idAddress')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Project'


class Pvstructure(models.Model):
    idpvstructure = models.AutoField(db_column='idPvStructure', primary_key=True)  # Field name made lowercase.
    idproject = models.ForeignKey(Project, models.DO_NOTHING, db_column='idProject')  # Field name made lowercase.
    designation = models.CharField(max_length=100)
    basematerial = models.IntegerField(db_column='baseMaterial')  # Field name made lowercase.
    basematrialthickness = models.CharField(db_column='baseMatrialThickness', max_length=100)  # Field name made lowercase.
    materialtypelayerone = models.CharField(db_column='materialTypeLayerOne', max_length=100)  # Field name made lowercase.
    thicknesstypelayerone = models.CharField(db_column='thicknessTypeLayerOne', max_length=100)  # Field name made lowercase.
    materialtypelayertwo = models.CharField(db_column='materialTypeLayerTwo', max_length=100)  # Field name made lowercase.
    thicknesstypelayertwo = models.CharField(db_column='thicknessTypeLayerTwo', max_length=100)  # Field name made lowercase.
    foundationtypetwo = models.CharField(db_column='foundationTypeTwo', max_length=100)  # Field name made lowercase.
    concretetype = models.CharField(db_column='concreteType', max_length=100)  # Field name made lowercase.
    foundationelectrical = models.CharField(db_column='foundationElectrical', max_length=100)  # Field name made lowercase.
    length = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'PvStructure'


class Role(models.Model):
    idrole = models.AutoField(db_column='idRole', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=50)
    state = models.CharField(max_length=8, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Role'


class Stakeholder(models.Model):
    idstakeholder = models.CharField(db_column='idStakeHolder', primary_key=True, max_length=36)  # Field name made lowercase.
    name = models.CharField(max_length=100)
    industry = models.CharField(max_length=100)
    email = models.CharField(unique=True, max_length=100)
    password = models.CharField(max_length=50)
    fax = models.CharField(max_length=255, blank=True, null=True)
    www = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=16)
    state = models.CharField(max_length=8, blank=True, null=True)
    idaddress = models.ForeignKey(Address, models.DO_NOTHING, db_column='idAddress')  # Field name made lowercase.
    idcontactperson = models.ForeignKey(Contactperson, models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercase.
    idpicture = models.ForeignKey(Picture, models.DO_NOTHING, db_column='idPicture', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'StakeHolder'


class Zone(models.Model):
    idzone = models.AutoField(db_column='idZone', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=100)
    earthingmaterial = models.ForeignKey(Material, models.DO_NOTHING, db_column='earthingMaterial')  # Field name made lowercase.
    insulationlength = models.ForeignKey(Material, models.DO_NOTHING, db_column='insulationLength', related_name='zone_insulationlength_set')  # Field name made lowercase.
    directionelectrically = models.CharField(db_column='directionElectrically', max_length=100)  # Field name made lowercase.
    altitude = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'Zone'
