set x=%cd%
md build\chrome
cd chrome
"c:\Program Files\WinRAR\WinRAR.exe" a -afzip "%x%.jar" * -r -m0
move "%x%.jar" ..\build\chrome
cd ..
copy install.* build
copy chrome.manifest build
cd build
"c:\Program Files\WinRAR\WinRAR.exe" a -afzip "%x%.xpi" * -r -m5
move "%x%.xpi" ..\
cd ..
rd build /s/q
