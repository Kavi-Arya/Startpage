// Init
document.addEventListener("DOMContentLoaded", function(event) {
  const commandInput = document.getElementById("commandInput");
  let commandHistory = [];
  let historyIndex = 0;
  let shortcuts = []; // Array to store the loaded shortcuts

  // History
  commandInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const command = commandInput.value.trim();
      handleCommand(command);
      commandInput.value = "";
      commandHistory.push(command);
      historyIndex = commandHistory.length;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        commandInput.value = commandHistory[historyIndex];
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        commandInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        commandInput.value = "";
      }
    } else if (event.key === "Escape") {
      commandInput.blur();
    }
  });
      document.addEventListener("keydown", function(event) {
    if (event.key === "i") {
      if (document.activeElement !== commandInput) {
        event.preventDefault();
        commandInput.focus();
      }
    }
  });

  const output = document.querySelector(".output");

  // Prompt
  function handleCommand(command) {
    const pre = document.createElement("pre");
    pre.textContent = `[kvl@surf ~]$ ${command}`;
    output.appendChild(pre);

    // Commands
    const [cmd, ...args] = command.trim().split(" ");
    switch (cmd) {
      case "help":
        output.innerHTML += `
          <pre>Available commands:</pre>
          <pre>- help: Show available commands</pre>
          <pre>- date: Display the current date</pre>
          <pre>- echo [text]: Print the provided text</pre>
          <pre>- search(se) [query]: Redirect to Google with the search query</pre>
          <pre>- ytsearch(yt) [query]: Redirect to youtube with the search query</pre>
          <pre>- clear(cl): Clear the screen</pre>
          <pre>- link(lk) [url]: Redirect to the specified URL</pre>
          <pre>- neofetch: Emulate the neofetch program to grab browser information</pre>
          <pre>- ls: List shortcuts to websites</pre>
          <pre>- ls -al: List shortcuts to websites in vertical line</pre>
          <pre>- goto [shortcut]: Redirect to the specified website shortcut</pre>
        `;
        break;
      case "date":
        const currentDate = new Date();
        output.innerHTML += `<pre>${currentDate.toISOString()}</pre>`;
        break;
      case "neofetch":
        const browserInfo = `
              User Agent: ${navigator.userAgent}
              Language: ${navigator.language}
              Cookies Enabled: ${navigator.cookieEnabled}
              Platform: ${navigator.platform}
              Vendor: ${navigator.vendor}
              Online: ${navigator.onLine ? "Yes" : "No"}
              Java Enabled: ${navigator.javaEnabled() ? "Yes" : "No"}
              Screen Resolution: ${window.screen.width}x${window.screen.height}
              Available Screen Width: ${window.screen.availWidth}
              Available Screen Height: ${window.screen.availHeight}
              Color Depth: ${window.screen.colorDepth}
              Device Pixel Ratio: ${window.devicePixelRatio}
              Browser Online: ${navigator.connection ? navigator.connection.type : "N/A"}
        `;
        output.innerHTML += `<pre>${browserInfo}</pre>`;
        break;
        // Go to any site 
      case "lk":
        if (args.length > 0) {
          let url = args[0];
          if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "http://" + url;
          }
          const link = document.createElement("a");
          link.href = url;
          link.target = "_blank";
          link.click();
        } else {
          output.innerHTML += "<pre>No URL provided.</pre>";
        }
        break;
      case "echo":
        output.innerHTML += `<pre>${args.join(" ")}</pre>`;
        break;
        // youtube search
      case "ytse":
        if (args.length > 0) {
          const query = encodeURIComponent(args.join(" "));
          window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
        } else {
          output.innerHTML += `<pre>No search query provided.</pre>`;
        }
      break;
      // Search with google
      case "se":
        if (args.length > 0) {
          const query = encodeURIComponent(args.join(" "));
          window.open(`https://www.google.com/search?q=${query}`, "_blank");
        } else {
          output.innerHTML += `<pre>No search query provided.</pre>`;
        }
        break;
        // Clear Command
      case "cl":
        output.innerHTML = "";
        break;
        // lists the available shortcuts
      case "ls":
        if (args.includes("-al")) {
          output.innerHTML += `
          <pre> google</pre>
          <pre> calender</pre>
          <pre> searx</pre>
          <pre> youtube</pre>
          <pre> twitter</pre>
          <pre> gmail</pre>
          <pre> netflix</pre>
          <pre> whatsapp</pre>
          <pre> reddit</pre>
          <pre> github</pre>
          <pre> amazon</pre>
          <pre> hotstar</pre>
          <pre> prime</pre>
          <pre> du</pre>
          <pre> stlogin</pre>
          <pre> aryabhatta</pre>
          <pre> chatgpt</pre>
          <pre> chess</pre>
          `;
        } else {
          output.innerHTML += `
          <pre><i class="icon nf-folder"></i> google calender searx youtube twitter gmail netflix whatsapp reddit github amazon hotstar prime du stlogin aryabhatta chatgpt chess</pre>
          `;
        }
        break;
        // Goto any bookmark
        case "goto":
        if (args.length > 0) {
          // i wanted to shift this to a json file but some fucking reason it does not working with that. Someone help me
          const shortcuts = {
            google: "https://www.google.com",
            calendar: "https://calendar.google.com/calendar",
            searx: "https://searx.be/",
            youtube: "https://www.youtube.com",
            twitter: "https://www.twitter.com",
            gmail: "https://mail.google.com",
            netflix: "https://www.netflix.com",
            whatsapp: "https://web.whatsapp.com",
            reddit: "https://www.reddit.com",
            github: "https://github.com",
            amazon: "https://www.amazon.com",
            hotstar: "https://www.hotstar.com",
            prime: "https://www.primevideo.com",
            du: "https://www.du.ac.in",
            stlogin: "https://aryabhattacollege.in/Internet/Index.aspx",
            aryabhatta: "https://aryabhattacollege.ac.in",
            chatgpt:"chat.openai.com/",
            chess: "https://www.chess.com",
          };

          const shortcut = args[0];
          if (shortcut in shortcuts) {
            const url = shortcuts[shortcut];
            window.open(url, "_blank");
          } else {
            output.innerHTML += `<pre>Shortcut not found: ${shortcut}</pre>`;
          }
        } else {
          output.innerHTML += `<pre>No shortcut provided.</pre>`;
        }
        break;
      default:
        output.innerHTML += `<pre>Command not found: ${command}</pre>`;
        break;
    }
      function handleCommand(command) {
    // Command handling logic...
  }
    output.scrollTop = output.scrollHeight;
  }
});
