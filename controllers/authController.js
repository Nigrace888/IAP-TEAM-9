import fs from 'fs';
//import { message } from 'statuses';

// LOGIN
export const Login = (req, res) => {
  const { name, password } = req.body;

  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

  const user = users.find(
    (u) => u.name === name && u.password === password
  );

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  return res.json({
    message: "login successful",
    user,
  });
};

// GET USERS
function get_users() {
  const data = fs.readFileSync("./users.json", "utf-8");
  return JSON.parse(data);
}

// SAVE USERS
function saveUsers(users) {
  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
}

// SIGNUP
export const Signup = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ message: "field empty" });
  }

  const users = get_users();

  const userExisted = users.find(u =>  u.email===email);

  if (userExisted) {
    return res.json({ message: "user already existed" });
  }

  const newUser = {
    id: users.length+1,
    name,
    email,
    password
  };

  users.push(newUser);
  saveUsers(users);

  return res.json({
    message: "signup successful",
    user: newUser
  });
};

export const deleteUser = (req, res) => {
    const { id } = req.params;

    
    const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

    
    const userIndex = users.findIndex(user => user.id == id);

    
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    
    users.splice(userIndex, 1)

    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

    res.json({ message: "User deleted successfully" });
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

    //const userIndex = users.findIndex(user => user.id == id);

    const userIndex = users.findIndex(user => user.id === Number(id));

    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users[userIndex] = {
        ...users[userIndex],
        name: name || users[userIndex].name,
        email: email || users[userIndex].email,
        password: password || users[userIndex].password
    };

    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

    res.json({
        message: "User updated successfully",
        user: users[userIndex]
    });
};