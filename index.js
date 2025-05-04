const express = require("express");
const { exec } = require("child_process");
const app = express();
app.use(express.json());

app.post("/run-curl", (req, res) => {
  const { url, headers, method, body } = req.body;

  if (!url) return res.status(400).json({ error: "Missing URL" });

  // Monta os headers
  const headerString = headers.map(h => `-H "${h}"`).join(" ");

  // Monta o corpo
  const dataString = body ? `-d '${JSON.stringify(body)}'` : "";

  // Monta o comando
  const curlCmd = `curl -i -X ${method || "POST"} "${url}" ${headerString} ${dataString}`;

  exec(curlCmd, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message, stderr });
    }

    // Retorna a resposta bruta (incluindo headers)
    res.json({ stdout });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Curl proxy running on port ${PORT}`));
