const concreteInput = document.getElementById('concrete');
const effectiveInput = document.getElementById('effective');
const resultButton = document.getElementById('result_button');

function acl_concrete_dominated(concrete, effective) {
  const concrDivide = concrete.split("/");
  const effectSeparate = effective.split(":");
  const outputText = document.getElementById('output_text');
  let returnAcl = false;

  for (let item of effectSeparate) {
    const effectDivide = item.split("/");
    if (concrDivide[1] === effectDivide[1]) {
      const concrAccessControl = concrDivide[0].split("");
      const effectAccessControl = effectDivide[0].split("");
      
      // intersection implemented here
      const intersectAccessControl = concrAccessControl
                                     .filter(el => effectAccessControl.includes(el));
      if (concrAccessControl.join("") === intersectAccessControl.join("")) {
        returnAcl = true;
      }
    }
  }
  // ouput result
  outputText.innerHTML += `acl_concrete_dominated("${concrete}", "${effective}")  ->  ${aclReturn}.\n`;
  return returnAcl;
}

function handlerResultButton() {
  const concrete = concreteInput.value.trim();
  const effective = effectiveInput.value.trim();
  if (concrete && effective) acl_concrete_dominated(concrete, effective);
}

document.getElementById('output_text').innerHTML = "Samples:\n";
acl_concrete_dominated("G/Time", "G/Time:GDP/Users");
acl_concrete_dominated("D/Users", "G/Time:GDP/Users");
acl_concrete_dominated("PD/Users", "G/Time:GDP/Users");
acl_concrete_dominated("POD/Users", "GDUPHO/Users:G/Time");
acl_concrete_dominated("P/Time", "G/Time:GDP/Users");
acl_concrete_dominated("H/Users", "G/Time:GDP/Users");
document.getElementById('output_text').innerHTML += "\nYour results:\n";
resultButton.addEventListener("click", () => handlerResultButton());


/*
In order to limit the options presented in a user interface, we wish to be able to determine if the given access rights granted to the current user include or does not include a given specific access.
Accesses are represented in "Access Control Lists"; these are colon-separated lists of access control entries. Each access control entry consists first of a list of operations ("G" for GET, "U" for PUT, "P" for POST, "D" for DELETE, "H" for HEAD, "O" for OPTIONS) then a slash and finally the name of the endpoint controlled.
For example, a user with "GET" access to the "Time" endpoint and "GET", "DELETE" and "POST" access to the "Users" endpoint would have an effective ACL that looks like: "G/Time:GDP/Users"
The ordering of operations and the order of endpoint names is not significant.
In our application we wish to have a simple and efficient function to determine of a single ACL entry is "dominated" by the users effective ACL. One ACL dominates another, if it contains at least the same access rights.

In other words:

"G/Time" is dominated by "G/Time:GDP/Users"
"D/Users" is dominated by "G/Time:GDP/Users"
"PD/Users" is dominated by "G/Time:GDP/Users"

but

"P/Time" is NOT dominated by "G/Time:GDP/Users"
"H/Users" is NOT dominated by "G/Time:GDP/Users"

Please provide the implementation for the following function:
function acl_concrete_dominated(concrete, effective)

Where 'concrete' is a single ACL entry like 'GH/Time' and 'effective' is a list of ACL entries like 'GPU/Users:G/Time'.
The function is expected to return true in the affirmative case, false in the negative and to throw on error.
*/