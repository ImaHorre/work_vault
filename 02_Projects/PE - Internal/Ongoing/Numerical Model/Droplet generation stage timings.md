
For predicting the droplet generation rate and pressure distribution when changing fluidic design and/or fluid system a nodal model was needed. 

One variation of that model looked at the droplet generation mechanic as two 'stages' and finding ways of evaluating both of those stages and predicting the timing for each based on their relationships with system inputs. 

![[droplet mechanism stage breakdown V5-30.png]]

***Stage 1*** : The oil meniscus starts at its furthest point from the DFU exit. Q<sub>oil</sub> within the DFU drives the meniscus forward. Driven by DFU resistance, *R* and $\Delta P$ over the DFU (*P<sub>oil(x)</sub>*   and *P<sub>water(x)</sub>*), where x is some distance along the length of the device. These local pressures can be found from solving and eventually reiterating over the device geometry and Q/P inputs the [[Nodal network]]. 

***Transition*** : Oil flows over the edge of the DFU while maintaining meniscus shape. 

***Stage 2*** : The apparent inflow/ flooding of continuous phase to the DFU causes constriction -> eventual droplet pinch-off. 

It appears that the ***Stage 1*** is the 'rate-limiting step' where the time taken for the oil to move back to the edge of the DFU taking much longer than the actual droplet pinch off for [[V4_10]] and [[V5_30]] designs taken to P<sub>oil</sub> < 500 *mbar*. There was a slight trend for *P<sub>oil</sub>* having an effect on ***Stage 2***, especially at lower pressures, where an increase in this snap off was observed. 

***Stage 1*** seems simply to be a function of $\Delta P_{DFU}$ and $R_{DFU}$, only. Whereas ***Stage 2*** is possibly more complicated, with links to the fluid system properties (viscosity $\mu$, contact angle $\theta$ and  interfacial tension $\gamma$) as well as some local pressure/resistance driving as the neck forms e.g. $\Delta P{junction}$ see [[Stage 2 breakdown]]

The overall idea now then and tying back in with the predictive model is that there is some link with the fluid system and/or device geometry which could for instance set the $L$ at which the meniscus resets to after a droplet snap-off event. $Q_{oil}$ , derived from the [[Nodal network]] then gives ***Stage 1*** time, then potentially ***Stage 2*** remains constant or tied empirically to fluid properties. This predictive model then then hopefully be derived via  analysis of experimental results at various $P_{oil}$ , $Q_{water}$ for a number of device designs, ideally over various critical fluid properties. 

[[droplet stage timings - dataset]] 
This excel stores data  extracted from experimental results looking at how flow input variables for dispersed and continuous phases effect droplet production timings (split by stage) across different devices and DFU locations. 

