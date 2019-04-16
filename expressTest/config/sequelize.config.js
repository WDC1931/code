module.exports = {
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test123",
  database: "test",

  dialect: "mysql",
  pool: {
    max: 60,
    min: 1
  },
  define: {
    timestamps: true,
    paranoid: true,
    underscored: true,
    underscoredAll: true,
    createdAt: "created_at",
    updatedAt: "update_at",
    deletedAt: "deleted_at",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci"
  }
};
