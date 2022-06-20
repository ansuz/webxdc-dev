# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

The `unreleased` heading is updated automatically to the right version and
release date when you use `npm version` (see `README.md`).

## [Unreleased]

### Changed

- Better implementation of webxdc: when you reload or reconnect, you get the
  correct messages.

### Fixed

- Make it so that we use an absolute path to find the `dist` directory in
  development mode so that the path where you start the tool shouldn't matter
  anymore.

## [0.2.1][] - 2022-06-20

### Fixed

- Use `version-changelog` to maintain changelog as it lets us maintain a manual
  changelog.

## [v0.2.0] - 2021-06-20

### Added

- Start maintaining this changelog.

- Ability to set base port number using `--port` on the CLI.

- Log WebXDC traffic on browser console with `send` and `recv` messages.

### Fixed

- Messages are sent to self too, not just to other instances.

- Better `selfAddr` and `selfName`.

[unreleased]: https://github.com/webxdc/webxdc-dev/compare/v0.2.1...HEAD
[0.2.1]: https://github.com/webxdc/webxdc-dev/tree/v0.2.1