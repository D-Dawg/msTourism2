module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'msTourism2',
      script    : 'index.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
        key: '~/.ssh/id_rsa',
        user: 'dworkz',
        host: '185.216.32.138',
        ref: 'origin/deployment',
        repo: 'git@github.com:D-Dawg/msTourism2.git',
        path: '/home/dworkz/home/msTourism2',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
