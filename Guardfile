# This an example guard file that can be copied to your project and adapted to run jasminejsx.

# https://github.com/guard/guard-shell
bin = File.expand_path("test/run", __dir__)

guard :shell, run_on_all: false do
	watch %r{^test/spec/[^/]+Spec.jsx} do |m|
		`#{bin} #{File.basename(m[0])}`
	end
end
