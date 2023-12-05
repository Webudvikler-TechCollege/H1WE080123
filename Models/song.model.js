import sequelize from "../Config/sequelize.config.js";
import { Model, DataTypes } from "sequelize";

class Song extends Model {}

Song.init({
	id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},{
	sequelize,
	modelName: 'song',
    underscored: true,
    //freezeTableName: true,
    //timestamps: false
})

export default Song
