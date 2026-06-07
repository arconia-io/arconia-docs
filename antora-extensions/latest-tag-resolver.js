'use strict'

const { execFileSync } = require('node:child_process')

module.exports.register = function ({ config }) {
  const targets = new Set(config?.sources ?? [])
  if (targets.size === 0) return

  this.on('playbookBuilt', ({ playbook }) => {
    for (const source of playbook.content.sources) {
      if (!targets.has(source.url)) continue
      const stdout = execFileSync(
        'git',
        ['ls-remote', '--tags', '--refs', '--sort=-v:refname', source.url, 'v*'],
        { encoding: 'utf8' }
      ).trim()
      if (!stdout) throw new Error(`latest-tag-resolver: no v* tags found for ${source.url}`)
      source.tags = stdout.split('\n')[0].split('refs/tags/')[1].trim()
    }
  })
}
