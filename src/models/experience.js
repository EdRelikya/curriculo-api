const getExperienceModel = (sequelize, { DataTypes }) => {
  const Experience = sequelize.define(
    "experience",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
      },
      description: {
        type: DataTypes.TEXT,
      },
      personId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { tableName: "experiences" },
  );

  Experience.associate = (models) => {
    Experience.belongsTo(models.Person, { foreignKey: "personId" });
  };

  return Experience;
};

export default getExperienceModel;