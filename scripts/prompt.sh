askpass() {
    pass=$(zenity --password --title="Touchscreen")
    case $? in
    0)
        flag="0"
        # TODO Add a loading widget while it is checking for password
        # labels: enhancement
        $(echo $pass | sudo -S /bin/sh $PWD/scripts/on.sh) && flag="1"
        if [ "$flag" == "1" ]; then
            echo "Successfully turned on"
            restart_prompt
        else
            zenity --error --text="Wrong Password"
            echo "Wrong Password"
        fi
        ;;
    1)
        echo "Stop login."
        ;;
    -1)
        echo "An unexpected error has occurred."
        ;;

    esac
}

restart_prompt() {
    if zenity --question --title="TouchScreen" --text="You have to restart your pc." --ok-label="Restart Now" --cancel-label="Restart Later" --no-wrap; then
        echo "restart now"
    else
        echo "restart later"
    fi
}


if zenity --question --text="Do you want to enable touch screen?" --title="TouchScreen" --no-wrap; then
    askpass
else
    echo "Closed"
fi


