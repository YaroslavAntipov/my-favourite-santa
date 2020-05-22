const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const database = require("./db");

const Users = database.define(
  "users",
  {
    roomid: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    present: {
      type: Sequelize.STRING
    },
    is_santa: {
      type: Sequelize.BOOLEAN
    },
    have_santa: {
      type: Sequelize.BOOLEAN
    },
    createdat: {
      field: "createdat",
      type: Sequelize.DATE
    },
    updatedat: {
      field: "updatedat",
      type: Sequelize.DATE
    }
  },
  {
    freezeTableName: true
  }
);

Users.associate = models => {
  Users.belongsTo(models.Rooms, {
    foreignKey: "roomid",
    sourceKey: "roomid"
  });
};

Users.createNew = async ({ name, wishes }, newRoomId) => {
  try {
    const newUser = {
      username: name,
      present: wishes,
      roomid: newRoomId,
      is_santa: false
    };
    return await Users.create(newUser);
  } catch (error) {
    //TODO error handling
  }
};

Users.readAll = roomid => {
  try {
    return Users.findAll({ where: { roomid } });
  } catch (error) {
    //TODO error handling
  }
};

Users.changeIsSantaAndFindWisher = async ({ username, roomid }) => {
  try {
    const santaUser = await Users.findOne({
      where: { username, roomid }
    });
    if (santaUser.is_santa) {
      return { error: "Already Santa" };
    }

    santaUser.is_santa = true;
    await santaUser.save();

    const wisherUser = await Users.findOne({
      where: {
        username: {
          [Op.ne]: username
        },
        have_santa: false
      }
    });

    wisherUser.have_santa = true;

    await wisherUser.save();

    return wisherUser;
  } catch (error) {
    //TODO error handling
  }
};

module.exports = Users;
