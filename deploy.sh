#!/bin/sh
#if  [ $# -ne 2 ]; then
#	echo "upload.sh <user> <host>"
#	exit 1
#fi

cd dist
rm dist.tar.gz
tar -cvzf dist.tar.gz *
scp dist.tar.gz root@bpresent-2:/var/www/lil-pub
ssh root@bpresent-2 << EOF
  cd /var/www/lil-pub
  tar -xvzf dist.tar.gz
  sudo service nginx restart
EOF
