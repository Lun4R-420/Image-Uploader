import { Router } from "express";

const router = Router();

const users = [
    {
        id: 1,
        name: "Ade"
    }
];

router.get("/", (req, res) => {
    res.json(users);
});

router.post("/", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(newUser);

    res.json(newUser);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    res.json(user);
})

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const deletedUser = users.splice(index, 1);

    res.json({
        message: "User deleted",
        user: deletedUser[0]
    });
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const name = req.body.name;

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.name = name;

    res.json(user);
});

export default router;