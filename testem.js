module.exports = {
  framework: "qunit",
  src_files: ["src/**/*"],
  serve_files: ["index.js"],
  disable_watching: true,
  launch_in_ci: ["Firefox", "Chrome"],
  browser_args: {
    Chrome: {
      mode: 'ci',
      args: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900',
      ].filter(Boolean),
    },
    Firefox: {
      mode: 'ci',
      args: ['--headless'],
    },
  }
}
