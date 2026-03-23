# V5 Device Development

*Final destination: 01_Product/Designs/V5-Device-Development.md*

## Design Intent
- **Purpose**: Advanced microfluidic device with improved droplet formation
- **Variants**: V5 (standard), V5-p (prototype), V5-30, V5-10
- **Requirements**: Reliable droplet formation, pressure resistance, multi-layer capability
- **Success Criteria**: Consistent droplet size, no blowout, oil/water separation

## Technical Approach  
- **Key Principles**: Precise channel geometry, optimized junction design
- **Materials**: COC (base), ECOC (lid), PTFe (sealing), UV curable resins
- **Process Steps**: Hot emboss → Bond → Anneal → Test
- **Critical Parameters**: Temperature (65-95°C), Pressure (2-4P), Time (1hr+)

## Validation Plan
- [x] **Pressure threshold testing**: 100-1000mbar range
- [x] **Flow rate optimization**: 1-20ml/hr testing
- [ ] **Multi-layer integration**: Stacked system validation  
- [ ] **Long-term stability**: 1+ week aging tests

## Known Risks & Issues
- **Risk 1**: Oil wetting on ECOC lid
  - Mitigation: Surface treatment research, alternative materials
- **Risk 2**: Blowout at specific locations
  - Mitigation: Junction design optimization, pressure mapping
- **Risk 3**: Channel collapse during high-temp bonding
  - Mitigation: Temperature/time optimization, equipment upgrade

## Implementation Notes
- **Critical Parameters**: Bond temperature affects channel integrity
- **Setup Requirements**: Proper hot emboss equipment essential
- **Monitoring Points**: Junction areas prone to blowout, connector sealing

## Results & Learnings
- **Performance vs Target**: 10um/30um variants more stable than 1um
- **Unexpected Findings**: ECOC lid contributes to oil wetting issues
- **Optimization Opportunities**: Alternative lid materials, surface treatments

## Links & References
- **Related Issues**: [[Oil-Wetting-Investigation]], [[Hot-Emboss-Equipment-Limitations]]
- **Source Material**: Journal entries 0501-3001
- **Follow-up Designs**: [[1um-Manufacturing-Process]]

## Version History
| Date | Version | Changes | Author |
|------|---------|---------|---------|
| Jan 2026 | 1.0 | Initial V5 development | Lab team |
| Jan 2026 | 1.1 | Multi-variant testing | Lab team |

## Next Steps
- Resolve ECOC lid oil wetting through surface treatment
- Optimize bonding parameters to prevent channel collapse
- Complete multi-layer stacked system integration

*Tags: #V5-design #microfluidics #droplet-formation #multi-layer #device-development*
*Source entries: Multiple Jan 2026 entries*
