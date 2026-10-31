const getPersonModel = (sequelize, { DataTypes }) => {
  const Person = sequelize.define(
    "person",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      summary: {
        type: DataTypes.TEXT,
      },
    },
    { tableName: "people" },
  );

  Person.associate = (models) => {
    Person.hasMany(models.Education, {
      foreignKey: "personId",
      as: "educations",
      onDelete: "CASCADE",
    });
    Person.hasMany(models.Experience, {
      foreignKey: "personId",
      as: "experiences",
      onDelete: "CASCADE",
    });
    Person.hasMany(models.Project, {
      foreignKey: "personId",
      as: "projects",
      onDelete: "CASCADE",
    });
  };

  return Person;
};

export default getPersonModel;