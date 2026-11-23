# /// script
# requires-python = ">=3.10"
# dependencies = ["segno>=1.6", "pyyaml>=6"]
# ///
"""Generate print-ready QR codes for every shortlink: each project's `go` number in
data/nips.yaml (→ /nips/<id>/) plus every slug in data/shortlinks.yaml (which overrides).

    uv run scripts/make_qr.py            # all slugs → qr/<slug>.svg + .png
    uv run scripts/make_qr.py 01 02   # only these

Codes point at https://www.justusmzb.de/go/<slug>/ (www + trailing slash = no redirect hops).
Error correction "Q" (25%) survives a logo sticker or a scuffed poster corner.
"""
import sys
from pathlib import Path

import segno
import yaml

BASE = "https://www.justusmzb.de/go/"
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "qr"


def main(slugs: list[str]) -> None:
    projects = yaml.safe_load((ROOT / "data" / "nips.yaml").read_text()) or []
    links = {str(p["go"]): f"/nips/{p['id']}/" for p in projects if p.get("go") and p.get("id")}
    links |= yaml.safe_load((ROOT / "data" / "shortlinks.yaml").read_text()) or {}
    unknown = set(slugs) - set(links)
    if unknown:
        sys.exit(f"unknown slug(s): {', '.join(sorted(unknown))}")
    OUT.mkdir(exist_ok=True)
    for slug in slugs or links:
        url = f"{BASE}{slug}/"
        qr = segno.make(url, error="q", boost_error=False)
        qr.save(OUT / f"{slug}.svg", scale=10, border=4, dark="#000", light="#fff")
        qr.save(OUT / f"{slug}.png", scale=20, border=4)
        print(f"{slug:<10} {qr.designator:<5} {qr.symbol_size(border=0)[0]}×  {url}  → {links[slug]}")


if __name__ == "__main__":
    main(sys.argv[1:])
