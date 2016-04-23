#!/usr/bin/env bash
sudo ps aux | awk '/node/{print $2}' | xargs sudo kill -9