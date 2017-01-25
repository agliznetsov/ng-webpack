#!/usr/bin/env bash

rm -rf dist
webpack --colors --progress --bail --release
