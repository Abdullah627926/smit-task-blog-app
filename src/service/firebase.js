import { app } from "@/config"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(app)
export const firebaseStorage = getStorage(app)
export const firebaseAuth = getAuth(app)