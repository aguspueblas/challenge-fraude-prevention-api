node ()
{
  stage ("Checkout devops framework")
  {
    env.JenkinsVersion="1.0"
    checkout scm
    try {
      repoName = sh(script: "cat .git/config | grep url | cut -d = -f 2 | xargs basename -s .git", returnStdout: true).trim()
    } catch (Exception ex){
      error('Error nombre de repositorio ' + ex)
    }
    /* f_funtions es la libreria general que vamos a utilizar*/
    f_funtions="function.groovy"
    f_environment="environment/openshift/${repoName}.groovy"
    /* Variales del repo devops*/
    url_git = "https://bitbucket.org/comafi/devops-jenkins"
    repoBranch = "master"
    credentialsId = "devops-bitbucket"
    folder = "devops"
    sh "mkdir -p ${folder}"
    dir ("${folder}")
    {
      try {
        git(
          url: "${url_git}",
          credentialsId: "${credentialsId}",
          branch: "${repoBranch}"
        )
      } catch(Exception e){
        println 'git plugin: ' + e 
      }
      stash name: 'Framework'
      devops = load "${f_funtions}"
      loadvar = load "${f_environment}"
      /* Cargo las variables Globales en la funcion set_env_global debe exister la variable env.f_flujo que es el flujo que se va a usar */
      loadvar.set_env_global()
      /* Cargo el flujo */
      flujo = load "flujos/${f_flujo}"
    }
  }
  stage ("flow")
  {
    /* Ejecuto el flujo */ 
    flujo.flujo()
  }
}