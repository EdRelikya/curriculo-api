const getEducationModel = (sequelize, { DataTypes }) => {
  const Education = sequelize.define(
    "education",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      institution: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      degree: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      fieldOfStudy: {
        type: DataTypes.STRING,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
      },
      personId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { tableName: "educations" },
  );

  Education.associate = (models) => {
    Education.belongsTo(models.Person, { foreignKey: "personId" });
  };

  return Education;
};

export default getEducationModel;