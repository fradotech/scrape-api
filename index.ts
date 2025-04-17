import app from "./src/app";

const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
