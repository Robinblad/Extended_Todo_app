import React, { useState, useContext } from "react";
import { DataContext } from "../../context";
import { Line } from "react-chartjs-2";

const [showPopup, setShowPopup] = useState(false);
const openPopup = () => setShowPopup(true);
