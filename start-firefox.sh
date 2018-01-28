#!/bin/bash

ember build --watch | web-ext run -s extension -u https://www.britishcycling.org.uk/events?search_type=upcoming
