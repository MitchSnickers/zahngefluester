# ops/altplattform

Betriebsskripte für die bestehende WordPress-Installation bei Strato. Sie
gehören hierher und nicht auf eine lokale Platte — die CLAUDE.md nennt als
ersten Punkt der Arbeitsumgebung ein „Git-Repo für den Betrieb der
Altplattform". Das hier ist es.

| Datei | Zweck | Läuft auf |
|---|---|---|
| `RUNBOOK-Backup.md` | Fünf Stufen mit benannten Prüfpunkten | — |
| `zg-backup.sh` | Tägliche Sicherung beider Datenbanken | Strato, per Cron |
| `zg-restore-probe.sh` | Spielt einen Dump isoliert zurück und prüft ihn | lokal, mit Docker |

## Was am 01.09.2026 dazugelernt wurde

- **Das SSH-Startverzeichnis ist `htdocs`.** Ausgeliefert wird aber
  `STRATO-apps/wordpress_0X/app`, nicht `htdocs` selbst. `~/backups/` liegt
  damit außerhalb des ausgelieferten Bereichs.
- **Die erste Fassung von `zg-backup.sh` hatte deshalb einen Fehler.** Die
  Sicherung brach ab, sobald der Pfad „htdocs" enthielt — auf diesem Account
  also immer. Sie hätte nie funktioniert. Korrigiert: geprüft wird gegen die
  App-Ordner, und der Browsertest aus Stufe 0 bleibt der eigentliche Beweis.
- **Zugriffsprotokolle liegen nicht auf der Shell**, nur im Strato-Kundenmenü
  unter Logfiles, und nur begrenzte Zeit.

## Stand

Das Runbook liegt seit dem 27.08.2026 vor. **Ausgeführt ist es nicht.** Es ist
der einzige offene Punkt des Projekts, bei dem Tätigwerden ein Risiko senkt,
statt Fortschritt zu erzeugen.
