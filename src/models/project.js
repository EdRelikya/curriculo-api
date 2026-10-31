const getProjectModel = (sequelize, { DataTypes }) => {
  const Project = sequelize.define(
    "project",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
      repositoryUrl: {
        type: DataTypes.STRING,
      },
      personId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { tableName: "projects" },
  );

  Project.associate = (models) => {
    Project.belongsTo(models.Person, { foreignKey: "personId" });
  };

  return Project;
};

export default getProjectModel;