


function getInitials(tokenData){
    let {fName, lName} = tokenData;
    let initials = fName.charAt(0) + lName.charAt(0);

    return initials;
}

export default getInitials;