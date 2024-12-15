//archivo que usa repo creator para colocar dentro del repo de la aplicacion
def setenv(def file_stack="null")
{
  if (env.BRANCH_NAME == "develop")
  {
    sh 'echo "$(date) : Seteando variables - BRANCH = ${BRANCH_NAME}"'
    return false
  }
  else if (env.BRANCH_NAME =~ "feature/*" || env.BRANCH_NAME =~ "bugfix/*")
  {
    sh 'echo "$(date) : Seteando variables - BRANCH = ${BRANCH_NAME}"'
    env.VARIABLE1="ejemplo"
    env.VARIABLE2="ejemplo2"
    //parameter_overrides de ejemplo, se deben usar las variables correspondientes a cada proyecto
    //env.parameter_overrides="UUID=${random} Environment=${ENV} DeployBucket=${BUCKET} StackName=${STACK}"
    //env.parameter_overrides_security="Environment=${ENV} Project=${PROJECT}"
    return false
  }
  else
  {
    echo "ERROR: No entro a ninguna condicion de branch = ${env.BRANCH_NAME}"
    devops.fail()
  }
}
return this;