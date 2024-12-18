import admin from "firebase-admin";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// force deleteaaasdbgvufgulv

const PORT = process.env.PORT || 3000;
const app = express();
dotenv.config();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173/'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());

const serviceAccount = path.resolve(process.env.API_FIREBASE_ARCHIVE);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("Firebase inicializado con éxito");

const db = admin.firestore();

app.get("/", async (req, res) => {
  console.log("BIENVENIDO A MI BACK");
  res.json("Bienvenido");
});


app.get("/listUsers", async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    res.status(200).json({
      message: "Usuarios obtenidos con éxito",
      users: listUsersResult.users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
});

app.post("/createUser", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "El email y la contraseña son obligatorios" });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    res.status(201).json({
      message: "Usuario creado con éxito",
      user: userRecord,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({
      message: "Error al crear usuario",
      error: error.message,
    });
  }
});

process.noDeprecation = true;

app.listen(PORT, () => {
  console.log(`Servidor express corriendo en http://localhost:${PORT}`);
});
