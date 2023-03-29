import { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";

import { useNavigate } from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseConfig } from "../firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        console.log("Registered with:", user.email);
        setDoc(doc(db, "users", user.uid), {
          name: name,
        });
        alert("Registered Successfully");
        navigate("/login");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          alert("That email address is invalid!");
        }

        console.error(error);
      });
  };

  return (
    <form
      className="container mx-auto mt-[100px] flex flex-col gap-4 p-8"
      onSubmit={handleRegister}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="youremail.com"
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your name"></Label>
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder="Your name"
          required={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput
          id="password1"
          type="password"
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Register;
