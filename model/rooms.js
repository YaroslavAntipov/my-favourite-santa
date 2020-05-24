const Sequelize = require('sequelize');
const database = require('./db');

const Rooms = database.define(
  'rooms',
  {
    roomid: {
      type: Sequelize.TEXT
    },
    createdat: {
      field: 'createdat',
      type: Sequelize.DATE
    },
    updatedat: {
      field: 'updatedat',
      type: Sequelize.DATE
    }
  },
  {
    freezeTableName: true
  }
);

Rooms.associate = models => {
  Rooms.hasMany(models.Users, {
    foreignKey: 'roomid',
    sourceKey: 'roomid'
  });
};

Rooms.createNew = async newRoomId => {
  try {
    const room = new Rooms({ roomid: newRoomId });
    
    await room.save();

    return room;
    } catch (error) {
    //TODO error handling
  }
};

Rooms.readAll = async (req, res) => {
  try {
    const rooms = await Room.find();
    return res.send({ rooms });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = Rooms;
